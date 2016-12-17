class User < ApplicationRecord
  has_many :sessions
  has_many :tweets
end
