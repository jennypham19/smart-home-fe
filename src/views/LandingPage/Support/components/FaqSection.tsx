import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'Sản phẩm mới mua nhưng không lên nguồn, phải làm sao?',
    a: 'Vui lòng kiểm tra lại nguồn điện, dây cắm và các kết nối cơ bản. Nếu thiết bị vẫn không lên nguồn, hãy liên hệ hotline 0328016662 để được kỹ thuật viên hỗ trợ kiểm tra và xử lý.',
  },
  {
    q: 'Thiết bị hoạt động chập chờn, kết nối Wi-Fi/Bluetooth kém xử lý thế nào?',
    a: 'Bạn có thể thử khởi động lại thiết bị và router, cập nhật phần mềm mới nhất. Nếu tình trạng vẫn tiếp diễn, đội ngũ kỹ thuật ZTECH sẽ hỗ trợ kiểm tra từ xa hoặc tại cửa hàng gần nhất.',
  },
  {
    q: 'Sản phẩm bị lỗi trong thời gian bảo hành thì có được đổi trả không?',
    a: 'Sản phẩm lỗi do nhà sản xuất trong thời gian bảo hành sẽ được đổi mới hoặc sửa chữa miễn phí theo đúng chính sách bảo hành đã công bố khi mua hàng.',
  },
  {
    q: 'Tôi làm mất phụ kiện hoặc sản phẩm thiếu phụ kiện khi nhận hàng thì phải làm sao?',
    a: 'Vui lòng liên hệ ngay với chúng tôi qua hotline hoặc form yêu cầu hỗ trợ, ZTECH sẽ kiểm tra đơn hàng và gửi bổ sung phụ kiện còn thiếu trong thời gian sớm nhất.',
  },
  {
    q: 'Tôi không biết cách cài đặt và sử dụng thiết bị sau khi mua thì có được hỗ trợ không?',
    a: 'Có. Đội ngũ hỗ trợ kỹ thuật của ZTECH sẽ hướng dẫn cài đặt, kết nối và sử dụng thiết bị chi tiết qua điện thoại, video call hoặc trực tiếp tại cửa hàng.',
  },
];

export default function FaqSection() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 1.5, fontSize: { xs: '1.6rem', md: '2rem' }, color: 'common.white' }}>
          Câu hỏi thường gặp
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: 5 }}>
          Giải quyết nhanh chóng cùng các thắc mắc thường gặp.
        </Typography>

        {faqs.map((item) => (
          <Accordion
            key={item.q}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: '#121a2a',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '10px !important',
              mb: 1.5,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}>
              <Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
