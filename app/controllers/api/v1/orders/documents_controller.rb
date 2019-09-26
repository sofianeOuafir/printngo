class Api::V1::Orders::DocumentsController < ApplicationController
  def create
    if current_user
      puts 'yo'
      byebug
    elsif current_visit
      document = Document.create
      document.file.attach(params[:file])
      puts 'ya'
      byebug
    end
  end
end
