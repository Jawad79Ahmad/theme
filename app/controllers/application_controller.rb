# frozen_string_literal: true

# :nodoc:
class ApplicationController < ActionController::Base
  include DashboardsHelper
  protect_from_forgery

  before_action :beforeFilter
  before_action :set_paper_trail_whodunnit
  before_action :authenticate_user!
  before_action :set_current_user

  def attributes_for_filter
    @attributes_for_filter = []
    controller_name.classify.constantize.reflect_on_all_associations.map(&:name).each do |x|
      x = x.to_s.singularize.constantize

      next if x.include? 'image'

      @attributes_for_filter << x.column_names
    end
  end

  def update_selected
    object = params[:class_name].constantize.find_by(id: params[:id])
    object&.update(selected: params[:selected])
    result = { result: true }
    result = { result: false, errors: object.errors.full_messages } if object.errors.any?
    respond_to do |format|
      format.json { render json: result }
    end
  end

  def bulk_update_selected
    class_name = params[:class_name].constantize
    class_name.where(id: params[:selected]).update_all(selected: true)
    class_name.where(id: params[:unselected]).update_all(selected: false)
    message = { result: true, message: 'Updated all objects' }
    respond_to do |format|
      format.json { render json: message }
    end
  end


  def beforeFilter
     $request = request
  end

  private

  def set_current_user
    return unless current_user.present?

    Current.user = current_user
  end
end
