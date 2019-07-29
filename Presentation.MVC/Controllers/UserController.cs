using Business.User;
using System.Web.Mvc;

namespace Presentation.MVC.Controllers
{
    public class UserController : BaseController
    {
        // GET: User
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        public ActionResult Index()
        {
            var user = _userService.AdminLogin("test", "123");
            return View(user.Result);
        }

        public ActionResult Login()
        {
            return View();
        }
    }
}