import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Row, Col, Popconfirm } from 'antd';
import { netApi as api } from 'network';
import { getFormatFormData } from 'utils';
import PersonDetail from './PersonDetail';
import mapToProps from './mapping';
import styles from './index.less';

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class setPerson extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalData: {},
            isAdd: false,
        };
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: '地点名称',
                dataIndex: 'placeName',
                align: 'center',
            },
            {
                title: '姓名',
                dataIndex: 'securityPersonnelName',
                align: 'center',
            },
            {
                title: '联系人电话',
                dataIndex: 'securityPersonnelPhone',
                align: 'center',
            },
            {
                title: '联系人邮箱',
                dataIndex: 'securityPersonnelMail',
                align: 'center',
            },
            {
                title: '联系人地址',
                dataIndex: 'securityPersonnelAddress',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                align: 'center',
                render: (text, record) => {
                    const param = { id: record.id };
                    const dividerItem = <span className="ant-divider"></span>;
                    return (
                        <div>
                            <a href="#" onClick={ (e) => { this.handleFormData(record, e); } }>编辑</a>
                            {dividerItem}
                            <Popconfirm title="确认要删除吗" onConfirm = { () => { this.removePerson(param); } }>
                                <a>删除</a>
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ];
    }

    static propTypes = {
        pagination: PropTypes.object,
        loading: PropTypes.bool,
        personList: PropTypes.array,
        getPersonList: PropTypes.func,
    }

    componentDidMount() {
        this.props.getPersonList();
    }

    /**
     * 删除人员
     */
    removePerson = (param) => {
        this.modifyPeople({ ...param, oprationType: -1 });
    }

    /**
     * 新增人员
     */
    addNewPerson = (param) => {
        this.modifyPeople(param, () => this.toggleCancel());
    }

    modifyPeople = async (param, callback) => {
        await api.post('/output/PeopleManagerINfo/modifyPeople', param).then((res) => {
            callback && callback();
            this.props.getPersonList();
        });
    }

    /**
     * 弹框切换事件
     */
    toggleCancel = (visible = false, isAdd = true, modalData = {}) => {
        this.setState({
            visible,
            modalData,
            isAdd,
        });
    }

    /**
     * 更改表单数据
     */
    handleFormChange = (changedFields) => {
        this.setState(({ modalData }) => ({
            modalData: { ...modalData, ...changedFields },
        }));
    }

    /**
     * 初始化表单数据
     */
    handleFormData = (data) => {
        this.toggleCancel(true, false, getFormatFormData(data, {}));
    }

    render() {
        const { personList, loading } = this.props;
        const { visible, modalData, isAdd } = this.state;
        console.log(visible, modalData);
        return (
            <div className={styles.personWrapper}>
                <Row gutter={8}>
                    <Col span={24} style={{ textAlign: 'right', marginBottom: '20px' }}>
                        <Button type="primary" onClick={() => this.toggleCancel(true)}>新增</Button>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Table
                            bordered
                            rowSelect={false}
                            dataSource={personList}
                            columns={this.columns}
                            loading={loading}
                            rowKey='id'
                            onChange={this.handleSearch}
                        />
                    </Col>
                </Row>
                {
                    visible ? (
                        <PersonDetail
                            isAdd={isAdd}
                            formData={modalData}
                            handleSubmitBtnClick={this.addNewPerson}
                            handleCancel={() => this.toggleCancel()}
                            onFormChange={this.handleFormChange}
                        />
                    ) : null
                }
            </div>
        );
    }
}
