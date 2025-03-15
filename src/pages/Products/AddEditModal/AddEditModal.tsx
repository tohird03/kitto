import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {PlusOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Form, Input, InputNumber, Modal, Upload, UploadFile, UploadProps} from 'antd';
import {RcFile} from 'antd/es/upload';
import {productsApi} from '@/api/products';
import {IAddEditProduct} from '@/api/products/types';
import {productsListStore} from '@/stores/products-list';
import {addNotification} from '@/utils';
import {priceFormat} from '@/utils/priceFormat';
import {UPLOAD_ACCEPT} from '../constants';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const {mutate: addNewProduct} =
    useMutation({
      mutationKey: ['addNewProduct'],
      mutationFn: (params: IAddEditProduct) => productsApi.addNewProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getProducts']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateProduct} =
    useMutation({
      mutationKey: ['updateProduct'],
      mutationFn: (params: FormData) => productsApi.updateProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getProducts']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  // IMG
  const handleBeforeUpload = () => false;

  const handleImgChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setBannerFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();

    setPreviewImage(src);
    setPreviewOpen(true);
    image.src = src;
  };


  const handleSubmit = (values: IAddEditProduct) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    if (bannerFileList.length > 0) {
      const file = bannerFileList[0].originFileObj as RcFile;

      formData.append('image', file);
    }

    if (productsListStore?.singleProduct) {
      formData.append('id', productsListStore?.singleProduct?.id!.toString());

      updateProduct(formData);
    } else {
      addNewProduct(formData as unknown as IAddEditProduct);
    }
  };

  const handleModalClose = () => {
    productsListStore.setSingleProduct(null);
    productsListStore.setIsOpenAddEditProductModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (productsListStore.singleProduct) {
      form.setFieldsValue({
        ...productsListStore.singleProduct,
      });
    }
  }, [productsListStore.singleProduct]);

  return (
    <Modal
      open={productsListStore.isOpenAddEditProductModal}
      title={productsListStore.singleProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={productsListStore.singleProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item label="Изображение" rules={[{required: true}]}>
          <Upload
            maxCount={1}
            onPreview={handlePreview}
            beforeUpload={handleBeforeUpload}
            onChange={handleImgChange} fileList={bannerFileList}
            listType="picture-card" accept={UPLOAD_ACCEPT}
          >
            {bannerFileList.length === 0 && (
              <div>
                <PlusOutlined />
                <div style={{marginTop: '8px'}}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Mahsulot nomi"
          rules={[{required: true}]}
          name="name"
        >
          <Input placeholder="Mahsulot nomi" />
        </Form.Item>
        <Form.Item
          label="O'ramdagi mahsulotlar soni"
          rules={[{required: true}]}
          name="quantity"
        >
          <InputNumber
            placeholder="O'ramdagi mahsulotlar soni"
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Ogohlantiruvchi qoldiq"
          name="warningThreshold"
        >
          <InputNumber
            placeholder="Ushbu sondan kam qolgan mahsulot haqida sizni ogohlantiramiz!"
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Sotib olingan narxi"
          rules={[{required: true}]}
          name="cost"
        >
          <InputNumber
            placeholder="Sotib olingan narxi"
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Sotish narxi"
          rules={[{required: true}]}
          name="price"
        >
          <InputNumber
            placeholder="Sotish narxi"
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
