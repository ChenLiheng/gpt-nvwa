/**
 * @author: big.bro
 * @date:  2023-03-05
 * @time: 17:44
 * @contact: chenliheng@youlai.cn
 * @description: #
 */

import styles from './index.less';
import { FC } from 'react';
import iconGuide1 from '@/assets/icons/guide1.svg';
import iconGuide2 from '@/assets/icons/guide2.svg';
import iconGuide3 from '@/assets/icons/guide3.svg';

interface GuideListProps {
  onChange: (val: string) => void;
}

const GuideList: FC<GuideListProps> = ({ onChange = () => {} }) => {
  const guideData = [
    {
      icon: iconGuide1,
      title: 'AI创作',
      data: ['写一篇简短的科幻小说', '写一首赞美祖国的诗词', '写一首儿歌'],
    },
    {
      icon: iconGuide2,
      title: '知识百科',
      data: ['量子力学主要理论', '麦克斯韦方程组', '爱因斯坦相对论'],
    },
    {
      icon: iconGuide3,
      title: '个人助理',
      data: ['工作周报优化', '给女神写几句赞美的词', '翻译：'],
    },
  ];
  return (
    <div className={styles.guideContainer}>
      <div className={styles.title}>免费使用ChatGPT</div>
      <div className={styles.tip}>无需注册，不收集个人隐私数据</div>
      <div className={styles.guideList}>
        {guideData.map((item) => (
          <div className={styles.guideItem} key={item?.title}>
            <img src={item.icon} className={styles.icon} alt="guide" />
            <div className={styles.guideTitle}>{item.title}</div>
            {item?.data?.map((val) => (
              <div
                key={val}
                className={styles.guide}
                onClick={() => onChange(val)}
              >
                {val} →
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideList;
