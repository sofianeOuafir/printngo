class SendgridMailer
  def initialize
    @sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    @from = 'contact@printngo.ca'
  end

  def order_confirmed_email(order)
    user = order.user
    partner = order.partner
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": user.email
            }
          ],
          "dynamic_template_data": {
            firstname: user.firstname,
            name: partner.name,
            address: partner.address,
            city: partner.city,
            country: partner.country,
            lat: partner.lat,
            lng: partner.lng,
            postcode: partner.postcode,
            id: order.id,
            opening_hours: partner.opening_hours
          }
        }
      ],
      "from": {
        "email": from
      },
      "template_id": 'd-37305aec46ae4898a40df3ad3ce89e13'
    }
    send_email(data)
  end

  def send_welcome_email(user)
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": user.email
            }
          ],
          "dynamic_template_data": { firstname: user.firstname }
        }
      ],
      "from": {
        "email": from
      },
      "template_id": 'd-23c125a1683a4e7fac655d3844533c69'
    }
    send_email(data)
  end

  private

  def send_email(data)
    begin
      response = sg.client.mail._('send').post(request_body: data)
      return response.status_code
    rescue Exception => e
      puts e.message
    end
  end

  attr_reader :sg, :from
end
