require 'bcrypt'

module Sudoku
  module Models
    class User

      attr_reader :password
      attr_accessor :password_confirmation
      include DataMapper::Resource

      property :id, Serial
      property :email, String
      property :password_digest, Text
      property :username, String
      has n, :records

      validates_confirmation_of :password

      def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
      end

      def self.authenticate(username, password)
        user = first(username: username)
        user && BCrypt::Password.new(user.password_digest) == password ? user : nil
      end
    end
  end
end

