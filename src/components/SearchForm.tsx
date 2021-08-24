import React from 'react'
import { Form, Input, Button } from 'antd' 

function SearchForm(props: {
    searchStock: (stock: string) => void
}) {
    const [searchTerm, setSearchTerm] = React.useState("")

    return (
        <Form name="search-form">
            <h1>Stock History</h1>
            <Form.Item
                label="Stock"
                name="Stock"
                rules={[
                    { required: true, message: 'Please enter a stock code to search!' }
                ]}
            >
                <Input
                    name="stock"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => props.searchStock(searchTerm)}
                >
                Submit
                </Button>
            </Form.Item>
            </Form>
    )
}

export default SearchForm