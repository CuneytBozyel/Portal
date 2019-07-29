using System;

namespace DataAccess.EntityPattern
{
    public class UnitOfWork : IUnitOfWork
    {
        private Entity.SoftwareApplicationEntities _dataContext;
        public UnitOfWork(Entity.SoftwareApplicationEntities dataContext)
        {
            if (dataContext == null)
                throw new ArgumentNullException();

            _dataContext = dataContext;
        }
        public UnitOfWork()
            : this(new Entity.SoftwareApplicationEntities())
        {

        }
        public IGenericRepository<T> Repository<T>() where T : class
        {
            return new GenericRepository<T>(_dataContext);
        }
        public int SaveChange()
        {
            try
            {
                return _dataContext.SaveChanges();
            }
            catch (Exception)
            {
                //TODO : Logging metodu eklenir. 
                throw;
            }
        }
    }
}
