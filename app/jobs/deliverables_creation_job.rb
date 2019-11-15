class DeliverablesCreationJob < ApplicationJob
  queue_as :critical

  def perform(print_order)
    print_order.print_order_items.group_by(&:product_id).each do |product_id, order_items|
      combined_file = CombinePDF.new
      order_items.each do |order_item|
        file = CombinePDF.parse(Net::HTTP.get_response(URI.parse(order_item.document.file.service_url)).body)
        (1..order_item.quantity).each do
          combined_file << file
        end
      end
      filename = "#{print_order.id}_#{product_id}"
      pathname = Rails.root.join("tmp/#{filename}")
      combined_file.save pathname.to_s
      deliverable = print_order.deliverables.new(product_id: product_id)
      deliverable.file.attach(io: open(pathname), filename: filename, content_type: 'application/pdf')
      deliverable.save
    end
  end
end
