using Business.BaseResult;
using DataAccess.Entity;

namespace Business.User
{
    public interface IUserService
    {
        ServiceResult<Users> AdminLogin(string email, string passworld);
    }
}
