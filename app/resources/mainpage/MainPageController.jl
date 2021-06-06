module MainPageController
  
using Genie.Renderer.Html

struct FileLocations
    script1::String
    script2::String
    css1::String
    css2::String
end

searchdir(path,key) = filter(x -> occursin(key, x), readdir(path))

# automatic discovery of file locations
function FileLocations()
    script1 = "/mainpage/js/" * searchdir("./public/mainpage/js", "chunk")[1]
    script2 = "/mainpage/js/" * searchdir("./public/mainpage/js", "chunk")[4]
    css1 = "/mainpage/css/" * searchdir("./public/mainpage/css", "chunk")[1]
    css2 = "/mainpage/css/" * searchdir("./public/mainpage/css", "chunk")[3]
    return FileLocations(script1, script2, css1, css2)
end

function mainpage()
    html(:mainpage, :mainpage, FL=FileLocations())
end

end
