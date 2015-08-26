module Sudoku
  module Models
    class Record
      include DataMapper::Resource
      property :id, Serial
      property :time, Integer
      has 1, :user, through: Resource
    end
  end
end
