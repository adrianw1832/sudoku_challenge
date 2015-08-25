module Sudoku
  module Models
    class Record
      include DataMapper::Resource
      property :id, Serial
      property :time, Time
      belongs_to :user
    end
  end
end
