require 'bcrypt'

module Sudoku
  module Models
    class User

      attr_reader :password
      attr_accessor :password_confirmation

      include DataMapper::Resource
      property :id, Serial
      property :email, String
      property :username, String
      has n, :records

      def password=(password)
        @password = password
      end

    end
  end
end
