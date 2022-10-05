class AddAddressesToAddresses < ActiveRecord::Migration[6.1]
  def change
    add_column :addresses, :address2, :string
    add_column :addresses, :address3, :string
  end
end
