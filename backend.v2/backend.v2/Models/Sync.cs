using System.Collections.Generic;

public class Sync<TModel, TKey> {
    public TModel[] Add;
    public TModel[] Update;
    public TModel[] Delete;
    public TKey[] DeleteGuids;
}

public class Synched<TModel> {
    public TModel[] Add;
    public TModel[] Update;
    public TModel[] Delete;    
}