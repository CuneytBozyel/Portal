using Business.BaseResult;
using DataAccess.Entity;
using DataAccess.EntityPattern;
using System;
using System.Linq;

namespace Business.User
{
    public class UserService : BaseService<Users>, IUserService
    {

        public ServiceResult<Users> AdminLogin(string email, string passworld)
        {
            ServiceResult<Users> result = new ServiceResult<Users>();
            try
            {
                var user = Repo.Where(x => x.Email.Equals(email) && x.Password.Equals(passworld)).FirstOrDefault();

                result.Result = user;

            }
            catch (Exception ex)
            {
                // Logger.FileLog.Error(ex.Message, ex);
                //Test commit df sd f
            }
            return result;
        }
    }
}
