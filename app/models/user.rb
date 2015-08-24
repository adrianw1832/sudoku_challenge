require 'bcrypt'

module Sudoku
  module Models
    class User
      include DataMapper::Resource
      property :id, Serial
      has n, :records
    end
  end
end
