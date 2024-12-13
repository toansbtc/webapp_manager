// const action = "CREATE" || "UPDATE" || "DELETE" || "GETDATA" || "GETLISTDATA" || "NATIVESQL";

enum action {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    GETDATA = "GETDATA",
    GETLISTDATA = "GETLISTDATA",
    NATIVESQL = "NATIVESQL",
}

export default action;