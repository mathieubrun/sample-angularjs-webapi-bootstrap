using Castle.MicroKernel.Lifestyle.Scoped;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using SampleApplication.Web.Controllers;
using SampleApplication.Web.Data;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dependencies;
using System.Web.Http.Dispatcher;

namespace SampleApplication.Web
{
    public class WindsorConfig
    {
        public static IWindsorContainer Register<T>(HttpConfiguration config) where T : IScopeAccessor, new()
        {
            var container = new WindsorContainer();

            // just replace Web API dependency resolver with our own implementation, and we're ready to go
            config.DependencyResolver = new WindsorResolver(container);

            // when we begin registering many components, we should use installers here
            container.Register(Component.For<IDataProvider, DataProvider>().LifestyleScoped<T>());

            // register components one by one 
            // container.Register(Component.For<NamesController>().LifestyleScoped<T>());
            // container.Register(Component.For<ClientsController>().LifestyleScoped<T>());
            // container.Register(Component.For<RecommandationsController>().LifestyleScoped<T>());
            
            // register by convention
            container.Register(Classes.FromThisAssembly().BasedOn<ApiController>().LifestyleScoped<T>());

            return container;
        }

        /// <remarks>
        /// From : http://blog.ploeh.dk/2012/10/03/DependencyInjectioninASP.NETWebAPIwithCastleWindsor/
        /// </remarks>
        public class WindsorCompositionRoot : IHttpControllerActivator
        {
            private readonly IWindsorContainer container;

            public WindsorCompositionRoot(IWindsorContainer container)
            {
                this.container = container;
            }

            public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
            {
                var controller = (IHttpController)this.container.Resolve(controllerType);

                request.RegisterForDispose(
                    new Release(
                        () => this.container.Release(controller)));

                return controller;
            }

            private class Release : IDisposable
            {
                private readonly Action release;

                public Release(Action release)
                {
                    this.release = release;
                }

                public void Dispose()
                {
                    this.release();
                }
            }
        }

        /// <remarks>
        /// From : https://github.com/WebApiContrib/WebApiContrib.IoC.CastleWindsor/blob/master/src/WebApiContrib.IoC.CastleWindsor/WindsorResolver.cs
        /// </remarks>
        public class WindsorResolver : IDependencyResolver
        {
            private readonly IWindsorContainer _container;

            public WindsorResolver(IWindsorContainer container)
            {
                _container = container;
            }

            public IDependencyScope BeginScope()
            {
                return new WindsorDependencyScope(_container);
            }

            public void Dispose()
            {
                _container.Dispose();
            }

            public object GetService(Type serviceType)
            {
                if (!_container.Kernel.HasComponent(serviceType))
                    return null;

                return _container.Resolve(serviceType);
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                if (!_container.Kernel.HasComponent(serviceType))
                    return new object[0];

                return _container.ResolveAll(serviceType).Cast<object>();
            }
        }

        public class WindsorDependencyScope : IDependencyScope
        {
            protected readonly IWindsorContainer _container;
            private ConcurrentBag<object> _toBeReleased = new ConcurrentBag<object>();

            public WindsorDependencyScope(IWindsorContainer container)
            {
                _container = container;
            }

            public void Dispose()
            {
                if (_toBeReleased != null)
                {
                    foreach (var o in _toBeReleased)
                    {
                        _container.Release(o);
                    }
                }

                _toBeReleased = null;
            }

            public object GetService(Type serviceType)
            {
                if (!_container.Kernel.HasComponent(serviceType))
                    return null;

                var resolved = _container.Resolve(serviceType);
                if (resolved != null)
                    _toBeReleased.Add(resolved);

                return resolved;
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                if (!_container.Kernel.HasComponent(serviceType))
                    return new object[0];

                var allResolved = _container.ResolveAll(serviceType).Cast<object>();
                if (allResolved != null)
                {
                    allResolved.ToList().ForEach(x => _toBeReleased.Add(x));
                }

                return allResolved;
            }
        }
    }
}