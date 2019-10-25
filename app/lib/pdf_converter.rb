class PdfConverter
  def initialize(file)
    begin 
      @file = file
      mime = MimeMagic.by_magic(file)
      @type = mime.type
      @subtype = mime.subtype
      @dir_name = "#{File.dirname(file.path)}/"
      @filename = "#{File.basename(file.original_filename, File.extname(file.original_filename))}.pdf"
      @pdf_path = "#{dir_name}#{filename}"
    rescue
      @type = 'unknown'
    end
  end

  def process
    case type
    when 'application/pdf'
      { file: File.open(file.path), filename: filename, content_type: type }
    when 'image/jpeg'
      Prawn::Document.generate(pdf_path) do |pdf|
        pdf.image file.tempfile, fit: [pdf.bounds.right, pdf.bounds.top]
      end
      { file: File.open(pdf_path), filename: filename, content_type: type }
    when 'image/png'
      Prawn::Document.generate(pdf_path) do |pdf|
        pdf.image file.tempfile, fit: [pdf.bounds.right, pdf.bounds.top]
      end
      { file: File.open(pdf_path), filename: filename, content_type: type }
    else
      raise ArgumentError, "#{subtype.present? ? "#{subtype} format is" : 'File format'} not accepted. Please convert your file into PDF and try again!"
    end
  end

  private

  attr_reader :subtype, :file, :type, :dir_name, :filename, :pdf_path
end
