import React from 'react'
import { Form, Input, Button } from 'antd' 

function SearchForm(props: {
    searchStock: (stock: string) => void
}) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchButtonDisabled, setSearchButtonDisabled] = React.useState(true)

    const onSearchTermChange = (value: string) => {
        value === "" ? setSearchButtonDisabled(true) : setSearchButtonDisabled(false)
        setSearchTerm(value)
    }

    return (
        <Form name="search-form">
            <h1>Stock History</h1>
            <Form.Item
                label="Search for a stock using symbol/keywords"
                name="Stock"
                rules={[{ required: true, message: 'Please enter a stock code to search!' }]}
            >
                <Input
                    name="stock"
                    value={searchTerm}
                    onChange={event => onSearchTermChange(event.target.value)}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={searchButtonDisabled}
                    onClick={() => props.searchStock(searchTerm)}
                >
                Submit
                </Button>
            </Form.Item>
            </Form>
    )
}

export default SearchForm