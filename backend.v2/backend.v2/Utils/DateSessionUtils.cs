using System;
using System.Globalization;

public static class DateSessionUtils
{
    public static DateTime Now
    {
        get
        {
            return DateTime.UtcNow.ToUniversalTime();
        }
    }

    private static CultureInfo FormatProvider
    {
        get
        {
            return CultureInfo.InvariantCulture;
        }
    }

    private static string Format
    {
        get
        {
            return "yyyy-MM-ddTHH:mm:ss.fffzzz";
        }
    }

    public static string Stringify(DateTime date)
    {
        return date.ToString(Format, FormatProvider);
    }

    public static DateTime? Parse(string date)
    {
        if (date == null) return null;

        DateTime result = DateTime.MinValue;

        return DateTime.TryParseExact(date, Format, FormatProvider, DateTimeStyles.None, out result) ?
        result.ToUniversalTime() :
        (DateTime?)null;
    }
}