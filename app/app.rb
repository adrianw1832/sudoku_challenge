require 'sinatra/base'
require 'sinatra/flash'
require 'sinatra/partial'

require_relative 'data_mapper_setup'
require_relative 'helpers/app_helpers'
require_relative 'controllers/base'

Dir[__dir__ + '/controllers/*.rb'].each(&method(:require))

include Sudoku::Models

module Sudoku
  class MyApp < Sinatra::Base
    use Routes::Homepage
    use Routes::Signup
    use Routes::Sessions
  end
end
