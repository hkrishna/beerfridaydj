class PlayerController < ApplicationController

  before_filter(:select_song, :only => :embed)

  def index
    @users = User.all(:order => 'email ASC')
  end

  def embed
    render(:partial => 'embed')
  end

  private

  # Get all songs that might be played (the user is there and the
  # video hasn't been played), group them by user, select a user at
  # random, select a video from that user at random.
  #
  # Can't select the user first, because the user might not have
  # videos.
  def select_song
    if params[:seenVideos].present?
      videos = Video.all(:conditions => ['user_id IN (?) AND youtube_id NOT IN (?)',
                                         params[:users],
                                         params[:seenVideos]],
                         :include => :user)
    else
      videos = Video.all(:conditions => ['user_id IN (?)', params[:users]],
                         :include => :user)
    end

    videos = videos.group_by(&:user)

    unless videos.blank?
      @user  = videos.keys.sample
      @video = videos[@user].sample
    end
  end

end
