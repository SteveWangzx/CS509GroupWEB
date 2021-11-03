import React from 'react';
import { Form, Button, Input } from 'antd';

const SearchForm = () => {
  return (
    <Form name="customized_form_controls" layout="inline">
      <Form.Item name="searchWords">
        <Input placeholder="Search an algorithm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Search</Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
