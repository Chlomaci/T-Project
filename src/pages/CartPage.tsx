import {FC, useContext, useMemo, useState} from "react";
import {Button, Flex, Table, TableColumnsType, TableProps} from "antd";
import {Context} from "./MainPage";

const CartPage: FC = () => {

    type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

    const {cartProducts, setCartProducts} = useContext(Context)

    interface DataType {
        key: React.Key;
        title: string;
        price: number;
        totalPrice: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "Наименование товара",
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Цена за шт.',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Всего',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
    ];

    const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
        key: i,
        title: `Edward King ${i}`,
        price: 32,
        totalPrice: `${i}`,
    }));

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const getEnd = useMemo(() => {
        console.log(selectedRowKeys.length)
        switch (true){
            case selectedRowKeys.length % 100 >= 11 && selectedRowKeys.length % 100 < 20:
                return 'ов'
            default:
                break;
        }

        switch (selectedRowKeys.length % 10) {
            case 1:
                return ''
            case 2:
            case 3:
            case 4:
                return 'а'
            default:
                return 'ов'
        }
    }, [selectedRowKeys.length])

    return (
        <>
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle">
                        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                            Обновить (будет удалить)
                        </Button>
                        {hasSelected ? `Выбрано ${selectedRowKeys.length} товар${getEnd}` : null}
                    </Flex>
                    <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} showSorterTooltip={false} />
                </Flex>
        </>
    )
}

export default CartPage