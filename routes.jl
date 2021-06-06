using Genie.Router
using Genie.Requests
using Genie.Renderer.Json
using MainPageController
using DataFrames

const DROPDOWNITEMS = Dict("1" => "Entry 1", "2" => "Entry 2", "3" => "Entry 3")
const TABLEDATA = DataFrame(ID=[1, 2, 3, 4], Name=["AA", "BB", "CC", "DD"], 
                Country=["DE", "GB", "DK", "US"])

"""
    dict_to_dropdown(data)

Transform the `Dict` `data` to a dictionary with the correct data format for
the dropdowns.
"""
function dict_to_dropdown(dict::Dict)
    out = []
    for key in keys(dict)
        push!(out, Dict("id" => key,
            "value" => dict[key]))
    end
    return out
end

"""
    df_to_table(data, columns, id) 

Prepare a dictionary for the web frontend to show tabular data from the data source `data`, 
with column names from the vector `columns`.
"""
function df_to_table(df::DataFrame, columns, id) 
    out = []
    for i = 1:size(df, 1)
        dict = Dict("key" => df[i,1],
        "ID" => string(df[i,1]))
        for (j, name) in enumerate(columns)
            dict[name] = df[i,j + 1] * " " * string(id)
        end
        push!(out, dict)
    end
    return out
end

"""
    to_table_columns(colnames)

Convert the vector of column titles `colnames` to the dictionary used by the tables in the
web frontend.
"""
function to_table_columns(colnames)
    out = []
    for name in colnames
        push!(out,Dict("title" => name,
                    "dataIndex" => name,
                    "key" => name))
    end
    return out
end


route("/", MainPageController.mainpage)

route("/upload/fileSubmit", method=POST) do 
    payload = filespayload()
    filename = payload["Upload,file"].name
    @info filename
    write(payload["Upload,file"]; filename="./assets/uploads/" * filename)
end

route("/api/getData") do
    data = Dict("DDData" => dict_to_dropdown(DROPDOWNITEMS))
    return json(data)
end

route("/api/formSubmit", method=POST) do 
    data = jsonpayload()
    id = parse(Int, data["DataRequest"])
    columns = ["Name", "Country"]
    Data = Dict("dataSource" => df_to_table(TABLEDATA, columns, id),
            "columns" => to_table_columns(columns))
    return json(Data)      
end