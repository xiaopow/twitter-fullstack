class AddImageColumnsToTweets < ActiveRecord::Migration[5.0]
  def up
    add_attachment :tweets, :image
  end

  def down
    remove_attachment :tweets, :image
  end
end
