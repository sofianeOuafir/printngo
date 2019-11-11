class Api::V1::Partners::DeliverablesController < ApplicationController
  before_action :authenticate_partner!

  def show
    OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
    OpenURI::Buffer.const_set 'StringMax', 0
    deliverable = Deliverable.find(params[:id])
    if deliverable.print_order.printer_id.present?
      render json: { message: 'This action is not allowed' }, status: 403
    else
      pdf_content = open(deliverable.file.service_url)
      send_file(pdf_content, filename: 'something', disposition: 'inline', type: 'application/pdf')
    end
  end
end
