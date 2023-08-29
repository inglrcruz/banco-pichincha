import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/product-list';
import Form from './pages/product-form';
import NotFound from './pages/not-found';
import Loading from './components/loading';
import { connect } from 'react-redux'
import ConfirmationDialog from './components/confirmationDialog'
import { AppProps } from './interfaces/appInterface';
import { setDialogConfig } from './redux/actions/product'
import { useDispatch } from 'react-redux';

const App = ({ loading, dialogConfig, setDialogConfig }: AppProps) => {

  const [isDialogVisible, setIsDialogVisible] = useState<Boolean>(false)
  const dispatch = useDispatch()

  // Show the dialog when there is data in the title.
  useEffect(() => {
    if (dialogConfig?.title || dialogConfig?.message) {
      setIsDialogVisible(true)
    }
  }, [dialogConfig, setIsDialogVisible])

  /**
  * Handles the confirmation action of the dialog and hides the dialog.
  */
  const handleConfirmDialog = () => {
    setIsDialogVisible(false)
    setDialogConfig(null, dispatch)
  }

  return (
    <>
      {loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Form />} />
          <Route path="/update" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {isDialogVisible && (<ConfirmationDialog
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={handleConfirmDialog} />
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  loading: state.product.loading,
  dialogConfig: state.product.dialogConfig
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDialogConfig: (config: any) => setDialogConfig(config, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)