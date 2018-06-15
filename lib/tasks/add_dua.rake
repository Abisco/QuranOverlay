require 'nokogiri'
require 'open-uri'

task :add_dua, [:url, :dua_name] => [:environment] do |task, args|
    doc = Nokogiri::HTML(open(args[:url]))
    table = doc.css('table#table1')

    table[0].css('tr').each_with_index do |row, index|
        text = row.css('td')[0].text.remove("\n", "\t")
        text = text.gsub("ا", "َٴا")
        @dua = Dua.new(
            :dua_name_arabic => "Dua Nudba",
            :line_id => index,
            :arabic => text,
            :english_translation => row.css('td')[2].text.remove("\n", "\t")
        )
        @dua.save
    end
end