module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        @results = Record.all
        erb :homepage
      end
    end
  end
end
