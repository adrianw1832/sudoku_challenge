module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        @records = Record.all(limit: 10, order: [:time.asc])
        erb :homepage
      end
    end
  end
end
