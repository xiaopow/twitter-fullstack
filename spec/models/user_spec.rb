require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.create' do
    it 'should have many sessions' do
      user = FactoryGirl.create(:user)
      expect(user.sessions).to eq([])
    end

    it 'should have many tweets' do
      user = FactoryGirl.create(:user)
      expect(user.tweets).to eq([])
    end

    it 'must have the presence of email' do
      expect {
        FactoryGirl.create(:user, email: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have the presence of username' do
      expect {
        FactoryGirl.create(:user, username: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have the presence of password' do
      expect {
        FactoryGirl.create(:user, password: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with min. 3 characters' do
      expect {
        FactoryGirl.create(:user, username: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with max. 64 characters' do
      expect {
        FactoryGirl.create(:user, username: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with min. 8 characters' do
      expect {
        FactoryGirl.create(:user, password: 'c' * 7)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with max. 64 characters' do
      expect {
        FactoryGirl.create(:user, password: 'c' * 65)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a email with min. 5 characters' do
      expect {
        FactoryGirl.create(:user, email: 'c' * 4)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a email with max. 500 characters' do
      expect {
        FactoryGirl.create(:user, email: 'c' * 501)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique email' do
      FactoryGirl.create(:user, email: 'unique@test.com')

      expect {
        FactoryGirl.create(:user, email: 'unique@test.com')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique username' do
      FactoryGirl.create(:user, username: '12345678')

      expect {
        FactoryGirl.create(:user, username: '12345678')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'enforces username uniqueness in DB-level' do
      ActiveRecord::Base.connection.execute "INSERT INTO users (username, email, created_at, updated_at) VALUES ('example', 'email@1.com', current_timestamp, current_timestamp);"

      expect {
        ActiveRecord::Base.connection.execute "INSERT INTO users (username, email, created_at, updated_at) VALUES ('example', 'email@2.com', current_timestamp, current_timestamp);"
      }.to raise_error(ActiveRecord::RecordNotUnique)
    end

    it 'enforces DB-level username uniqueness in DB-level' do
      ActiveRecord::Base.connection.execute "INSERT INTO users (username, email, created_at, updated_at) VALUES ('case1', 'email@1.com', current_timestamp, current_timestamp);"

      expect {
        ActiveRecord::Base.connection.execute "INSERT INTO users (username, email, created_at, updated_at) VALUES ('case2', 'email@1.com', current_timestamp, current_timestamp);"
      }.to raise_error(ActiveRecord::RecordNotUnique)
    end
  end
end
