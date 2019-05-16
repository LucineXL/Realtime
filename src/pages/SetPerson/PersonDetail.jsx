import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Form, Row, Col, Input, message } from 'antd';
// import styles from './index.less';


const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const FormItem = Form.Item;

@connect()
@Form.create({
    mapPropsToFields: (props) => {
        const { formData } = props;
        const keys = Object.keys(formData);
        let newFormData = {};
        keys.forEach((item) => {
            newFormData[item] = Form.createFormField({
                ...formData[item],
                value: formData[item] && formData[item].value,
            });
        });
        return newFormData;
    },
    onFieldsChange(props, changeFields) {
        props.onFormChange(changeFields);
    },
})
export default class setPlace extends React.PureComponent {

    static propTypes = {
        form: PropTypes.object,
        isAdd: PropTypes.bool,
        formData: PropTypes.object,
        onFormChange: PropTypes.func,
        handleCancel: PropTypes.func,
        handleSubmitBtnClick: PropTypes.func,
    }

    handleOk = () => {
        const { form: { validateFields }, handleSubmitBtnClick, isAdd } = this.props;
        validateFields((err, values) => {
            if (!err) {
                const { id, placeId, securityPersonnelId, placeName, securityPersonnelName, securityPersonnelPhone,
                    securityPersonnelMail, securityPersonnelAddress } = values;
                const param = {
                    oprationType: isAdd ? 0 : 1,
                    id: id ? Number(id) : '',
                    placeId: placeId ? Number(placeId) : '',
                    securityPersonnelId: securityPersonnelId ? Number(securityPersonnelId) : '',
                    placeName: placeName || '',
                    securityPersonnelName: securityPersonnelName || '',
                    securityPersonnelPhone: securityPersonnelPhone || '',
                    securityPersonnelMail: securityPersonnelMail || '',
                    securityPersonnelAddress: securityPersonnelAddress || '',
                };
                handleSubmitBtnClick(param);
            } else {
                message.info('请确定表单是否填写完整或正确！');
            }
        });
    }

    render() {
        const { form: { getFieldDecorator }, handleCancel, isAdd } = this.props;
        getFieldDecorator('id');
        getFieldDecorator('placeId');
        getFieldDecorator('securityPersonnelId');
        return (
            <Modal
                visible={true}
                title={isAdd ? '新增人员配置' : '编辑人员配置'}
                onOk={this.handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='地点名称'>
                                {
                                    getFieldDecorator('placeName', {
                                        rules: [{ required: true, message: '请输入地点名称' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='地点id'>
                                {
                                    getFieldDecorator('placeId', {
                                        rules: [{ required: true, message: '请输入地点id' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='姓名'>
                                {
                                    getFieldDecorator('securityPersonnelName', {
                                        rules: [{ required: true, message: '请输入人员姓名' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='联系人电话'>
                                {
                                    getFieldDecorator('securityPersonnelPhone', {
                                        rules: [{ required: true, message: '请输入联系人电话' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='联系人邮箱'>
                                {
                                    getFieldDecorator('securityPersonnelMail', {
                                        rules: [{ required: true, message: '请输入联系人邮箱' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col md={8} sm={18}>
                            <FormItem {...formItemLayout} label='联系人地址'>
                                {
                                    getFieldDecorator('securityPersonnelAddress', {
                                        rules: [{ required: true, message: '请输入联系人地址' }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
