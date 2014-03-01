using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace SampleApplication.Web.Filters
{
    /// <summary>
    /// This filter will add some custom http header in the response (see : http://localhost:60000/#/webapi/filters)
    /// </summary>
    public class CustomHeaderAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// Taken from http://www.chucknorrisfacts.com/chuck-norris-favorite-facts of course
        /// </summary>
        private static readonly string[] Facts =
        { 
            "When the Boogeyman goes to sleep every night, he checks his closet for Chuck Norris.",
            "Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
            "There is no theory of evolution. Just a list of creatures Chuck Norris has allowed to live.",
            "Outer space exists because it's afraid to be on the same planet with Chuck Norris.",
            "Chuck Norris does not sleep. He waits.",
            "Chuck Norris is currently suing NBC, claiming Law and Order are trademarked names for his left and right legs.",
            "Chuck Norris is the reason why Waldo is hiding.",
            "Chuck Norris counted to infinity - twice.",
            "There is no chin behind Chuck Norris' beard. There is only another fist.",
            "When Chuck Norris does a pushup, he isn't lifting himself up, he's pushing the Earth down.",
            "Chuck Norris is so fast, he can run around the world and punch himself in the back of the head.",
            "Chuck Norris' hand is the only hand that can beat a Royal Flush.",
            "Chuck Norris can lead a horse to water AND make it drink.",
            "Chuck Norris doesn't wear a watch. HE decides what time it is.",
            "Chuck Norris can slam a revolving door.",
            "Chuck Norris does not get frostbite. Chuck Norris bites frost.",
            "Remember the Soviet Union? They decided to quit after watching a DeltaForce marathon on Satellite TV.",
            "Contrary to popular belief, America is not a democracy, it is a Chucktatorship."                             
        };

        /// <summary>
        /// After the action got executed
        /// </summary>
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            // add one random chuck norris fact to the response headers
            actionExecutedContext.Response.Headers.Add("Chuck-Norris-Fact", Facts.OrderBy(x => Guid.NewGuid()).First());
        }
    }
}