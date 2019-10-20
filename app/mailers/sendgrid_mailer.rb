class SendgridMailer
  def initialize
    @sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    @from = 'contact@printngo.ca'
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
    begin
      response = sg.client.mail._('send').post(request_body: data)
      return response.status_code
    rescue Exception => e
      puts e.message
    end
  end

  private

  attr_reader :sg, :from
end
