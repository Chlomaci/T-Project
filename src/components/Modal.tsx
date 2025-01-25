import {FC, ReactNode} from "react";
import { Button, Checkbox, Form, Input, Result  } from 'antd';
import {useAddUserMutation} from "../services/fakestore";
import type { FormProps } from 'antd';
import {Modal} from 'antd';


const ModalComponent: FC = ({props}) => {

    const {modal, setModal} = props;

    const handleCancel = () => {
        setModal(false);
    }

    const title: ReactNode = <h2 className='title'>Подпишись на наши новости</h2>

    const [addUser, {isLoading, isError, isSuccess}] = useAddUserMutation()

    type FieldType = {
        username?: string;
        email?: string;
        subscribe?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        addUser(values)
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title={title}
               open={modal}
               onCancel={handleCancel}
               footer={null}
               width='30vw'
               centered='true'>
            {isSuccess ?
                (<Result
                    title="Подписка успешно оформлена!"
                    extra={
                        <Button type="primary" key="ok" onClick={handleCancel}>
                            ОК!
                        </Button>
                    }
                />)
                : isLoading?
                    'loading'
                    :
                    (<Form
                        name="basic"
                        labelCol={{ span: 5, }}
                        labelAlign='left'
                        size='large'
                        style={{ }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Ваше имя"
                            name="username"
                            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                        >
                            <Input placeholder="введите имя" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Пожалуйста, введите ваш email'
                            }, {
                                type: 'email',
                                message: 'Пожалуйста, введите email!',
                            },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType> name="subscription" valuePropName="checked" label={null}>
                            <Checkbox>Подписаться на рассылку мемов с котиками</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Подписаться!
                            </Button>
                        </Form.Item>
                    </Form>)}
        </Modal>
    )
}

export default ModalComponent