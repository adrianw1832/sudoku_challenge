module Sudoku
  module Models
    class Record
      include DataMapper::Resource
      property :id, Serial
      belongs_to :user
    end
  end
end
