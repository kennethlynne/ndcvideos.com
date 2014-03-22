require 'spec_helper'

describe "@include outer-container()" do
  before(:all) do
    ParserSupport.parse_file("outer-container")
  end

  it "adds clearfix" do
    expect('.container-default:after').to have_rule('clear: both')
  end

  it "sets max-width" do
    expect('.container-default').to have_rule('max-width: 960px')
  end
end
