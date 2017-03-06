package test;

import java.io.BufferedOutputStream;
import java.io.Filess
import java.io.FileOutputStream;

import org.tmatesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.internal.wc.DefaultSVNOptions;ss
import org.tmatesoft.svn.core.wc.ISVNOptions;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNDiffClient;
import org.tmatesoft.svn.core.wc.SVNRevision;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class DoDiff {

	//声明SVN客户端管理类
	private static SVNClientManager ourClientManager;

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//注意：执行此操作要先执行checkout操作。因为本地需要有工作副本此范例才能运行。
		//初始化支持svn://协议的库
		SVNRepositoryFactoryImpl.setup();
		String name = "hanyi";
status = ourClientManager.getStatusClient().doStatus(commitFile, true);
			//如果此文件是新增加的则先把此文件添加到版本库，然后提交。
			if(status.getContentsStatus()==SVNStatusType.STATUS_UNVERSIONED){
				//把此文件增加到版本库中
				ourClientManager.getWCClient().doAdd(commitFile, false, false, false, SVNDepth.INFINITY,false,false);
				//提交此文件
				ourClientManager.getCommitClient().doCommit(
						new File[] { commitFile }, true, "",null,null,true, false, SVNDepth.INFINITY);
				System.out.println("add");
			}
			//如果此文件不是新增加的，直接提交。
			else{
				ourClientManager.getCommitClient().doCommit(
						new File[] { commitFile }, true, "",null,null,true, false, SVNDepth.INFINITY);
				System.out.println("commit");
			}
			status = ourClientManager.getStatusClient().doStatus(commitFile, true);
			//如果此文件是新增加的则先把此文件添加
			到版本库，然后提交
			。
			if(status.getContentsStatus()==SVNStatusType.STATUS_UNVERSIONED){
				//把此文件增加到版本库
				中
				ourClientManager.getWCClient().doAdd(commitFile, false, false, false, SVNDepth.INFINITY,false,false);
				//提交此文件
				ourClientManager.getCommitClient().doCommit(
						new File[] { commitFile }, true, "",null,null,true, false, SVNDepth.INFINITY);
				System.out.println("add");
			}
			//如果此文件不是新增加的，直接提交。
			else{
				ourClientManager.getCommitClient().doCommit(
						new File[] { commitFile }, true, "",null,null,true, false, SVNDepth.INFINITY);
				System.out.println("commit");
			}
		} catch (SVNException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(status.getContentsStatus());

	}

	}

}
