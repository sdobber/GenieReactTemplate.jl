module GenieReactTemplate

using Genie, Logging, LoggingExtras

function main()
  Base.eval(Main, :(const UserApp = GenieReactTemplate))

  Genie.genie(; context = @__MODULE__)

  Base.eval(Main, :(const Genie = GenieReactTemplate.Genie))
  Base.eval(Main, :(using Genie))
end

end
