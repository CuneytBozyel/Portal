using Core;
using System.Web.Mvc;

namespace Presentation.MVC.Controllers
{
    public class BaseController : Controller
    {
        public int AdminId => Session["User"].ToInt();
    }
}