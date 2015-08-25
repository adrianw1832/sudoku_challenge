module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        @records = Record.all.sort
        erb :homepage
      end
    end
  end
end
