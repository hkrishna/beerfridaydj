class User < ActiveRecord::Base
  has_many :videos

  def display_name
    @display_name ||= email.sub(/@.*$/,'')
  end
end
