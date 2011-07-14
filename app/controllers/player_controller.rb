class PlayerController < ApplicationController

  respond_to(:json, :only => [:next_song])

  def index
    @users = User.all
  end

  def embed
    @video = select_song(params[:users], params[:seenVideos])
    render(:partial => 'embed')
  end

  private

  # Get all songs that might be played (the user is there and the
  # video hasn't been played), group them by user, select a user at
  # random, select a video from that user at random.
  #
  # Can't select the user first, because the user might not have
  # videos.
  def select_song(user_ids, youtube_ids)
    if youtube_ids.present?
      videos = Video.all(:conditions => ['user_id IN (?) AND youtube_id NOT IN (?)', user_ids, youtube_ids])
    else
      videos = Video.all(:conditions => ['user_id IN (?)', user_ids])
    end
    videos = videos.group_by(&:user_id)
    user = videos.keys.sample
    videos[user].sample
  end

end
