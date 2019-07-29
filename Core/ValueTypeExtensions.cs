using System;

namespace Core
{
    public static class ValueTypeExtensions
    {
        public static bool IsNotNull(this string value)
        {
            return !string.IsNullOrWhiteSpace(value);
        }


        public static int ToInt(this object value)
        {
            int number = -1;
            try
            {
                number = Convert.ToInt32(value);
            }
            catch { }
            return number;
        }

        public static decimal ToDecimal(this object value)
        {
            decimal number = -1;
            try
            {
                number = Convert.ToDecimal(value);
            }
            catch { }
            return number;
        }

        public static bool IsNull(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }

    }
}
