require 'rails_helper'

RSpec.describe Tweet, type: :model do
  describe '.create' do
    it 'must belong to a user' do
      expect {
        Tweet.create!
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have the presence of message' do
      expect {
        FactoryGirl.create(:tweet, message: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a message with max. 140 characters' do
      expect {
        FactoryGirl.create(:tweet, message: 'c' * 141)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
