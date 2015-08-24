module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        erb :homepage
      end
    end
  end
end